import { Loader2 } from 'lucide-react'

export default function Loader() {
  return (
    <div className='flex h-48 items-center justify-center gap-2'>
      <Loader2 size={25} strokeWidth={3} className='animate-spin' />
    </div>
  )
}
