'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { acceptedImageTypes, createTeamForm } from '@schemas'

import Button from '~/components/ui/Button'
import Heading from '~/components/ui/heading'
import { Cancel } from '~/components/ui/modal'
import MessageBox from '~/components/message-box'
import TextModal from '~/components/text-modal'
import { createTeam } from '../_actions/create-team'
import { uploadImage } from '../_actions/upload-image'
import ImagePicker from './image-picker'
import Input from './input'
import InputError from './input-error'
import Label from './label'
import UtcPicker from './utc-picker'

import type { ModalError } from '@types'
import type { z } from 'zod'

interface CreateTeamFormProps {
  userId: string
}

export default function CreateTeamForm({ userId }: CreateTeamFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<ModalError | null>(null)
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof createTeamForm>>({
    resolver: zodResolver(createTeamForm)
  })

  watch((data, { name }) => {
    if (name !== 'flag') return
    const file = (data.flag as unknown as FileList)?.item(0)
    if (!file || !acceptedImageTypes.includes(file.type)) {
      return setPreviewImage(null)
    }
    setPreviewImage(URL.createObjectURL(file))
  })

  function clearPreviewImage() {
    setPreviewImage(null)
    resetField('flag')
  }

  async function onSubmit(data: z.infer<typeof createTeamForm>) {
    const flagBlob = new Blob([await data.flag!.arrayBuffer()])
    const flagForm = new FormData()

    flagForm.append('file', flagBlob)
    flagForm.append('teamName', data.name)

    const { data: flag, error: uploadImageError } = await uploadImage(flagForm)

    if (!flag || uploadImageError) {
      setError(defaultErrorMessage())
      return setOpen(true)
    }

    const teamForm = new FormData()
    teamForm.append('teamData', JSON.stringify({ ...data, flag, userId }))

    const { error: createTeamError } = await createTeam(teamForm)

    if (createTeamError) {
      switch (createTeamError.type) {
        case 'duplicate_team': {
          setError({
            title: 'TEAM ALREADY EXISTS!',
            message: createTeamError.message
          })
          break
        }
        case 'duplicate_player': {
          setError({
            title: 'ALREADY ON A TEAM!',
            message: createTeamError.message
          })
          break
        }
        case 'restricted': {
          setError({
            title: 'YOU ARE RESTRICTED!',
            message: createTeamError.message
          })
          break
        }
        default: {
          setError(defaultErrorMessage())
          break
        }
      }
      return setOpen(true)
    }

    setSuccess(true)
  }

  return !success ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-[300px] flex-col gap-3 bg-milky-white px-6 py-4'
    >
      <Heading className='sm:text-md text-light-blue' padding={false} sub>
        CREATE A TEAM.
      </Heading>

      <div className='group'>
        <Label htmlFor='name'>*Team Name</Label>
        <Input {...register('name')} />
        {errors.name?.message && <InputError message={errors.name.message} />}
      </div>

      <div className='group'>
        <Label htmlFor='acronym'>*Team Acronym</Label>
        <Input {...register('acronym')} />
        {errors.acronym?.message && (
          <InputError message={errors.acronym.message} />
        )}
      </div>

      <div className='group'>
        <Label htmlFor='timezone'>*Timezone</Label>
        <UtcPicker {...register('timezone')} />
        {errors.timezone?.message && (
          <InputError message={errors.timezone.message} />
        )}
      </div>

      <div className='relative'>
        <Label htmlFor='flag'>*Team Flag</Label>
        <ImagePicker
          previewImage={previewImage}
          clearPreviewImage={clearPreviewImage}
          {...register('flag')}
        />
        {errors.flag?.message && <InputError message={errors.flag.message} />}
      </div>

      <Button
        loading={isSubmitting}
        type='submit'
        className='w-full'
        variant='invertedOutline'
      >
        CREATE
      </Button>

      {error && (
        <TextModal
          open={open}
          setOpen={() => setOpen(!open)}
          title={error.title}
          message={error.message}
        >
          {error.title === 'TEAM ALREADY EXISTS!' ? (
            <Button href='/team' variant='outline'>
              TEAM MANAGEMENT
            </Button>
          ) : (
            <Cancel>CLOSE</Cancel>
          )}
        </TextModal>
      )}
    </form>
  ) : (
    <MessageBox
      title='TEAM CREATED!'
      message='Welcome to TEST Open Click the button below to view your team management page and start inviting players.'
    >
      <Button href='/team' variant='outline'>
        TEAM MANAGEMENT
      </Button>
    </MessageBox>
  )
}

function defaultErrorMessage() {
  return {
    title: 'Failed To Create Team',
    message:
      'We were unable to create your team. Looks like an issue on our end. Please try again to see if that helps.'
  }
}
