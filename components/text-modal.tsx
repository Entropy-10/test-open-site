import { Cancel, Content, Description, Root, Title } from './ui/modal'

interface TextModalProps {
  title: string
  message: string
  open: boolean
  setOpen: () => void
  children?: React.ReactNode
}

export default function TextModal({
  title,
  message,
  open,
  setOpen,
  children
}: TextModalProps) {
  return (
    <Root open={open} onOpenChange={setOpen}>
      <Content className='z-20 flex flex-col items-center justify-center'>
        <Title>{title}</Title>
        <Description className='text-center'>{message}</Description>
        {children ?? <Cancel>CLOSE</Cancel>}
      </Content>
    </Root>
  )
}
