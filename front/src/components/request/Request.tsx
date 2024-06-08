import { Stack } from '@mui/material'

type Props = {
  requestId: number
}

export default function Request({ requestId }: Props) {
  return <Stack>{requestId}</Stack>
}
