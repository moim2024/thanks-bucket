import { useState } from 'react'

import NicknameSetupForm from '@/components/signup/NicknameSetupForm'

function AnonymousSignInPage() {
  const [nickname, setNickname] = useState('')

  return (
    <NicknameSetupForm
      nickname={nickname}
      setNickname={setNickname}
      title="닉네임을 입력해주세요"
      buttonText="시작하기"
    />
  )
}

export default AnonymousSignInPage
