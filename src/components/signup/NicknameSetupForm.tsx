interface NicknameSetupProps {
  title: string
  buttonText: string
  children?: React.ReactNode
}

function NicknameSetupForm({
  title,
  buttonText,
  children,
}: NicknameSetupProps) {
  return (
    <>
      <form>
        <p>{title}</p>
        <label>
          닉네임
          <input
            type="text"
            placeholder="한글 영어 대/소문자 숫자만 입력 가능해요!"
          />
        </label>

        <button type="submit">{buttonText}</button>
      </form>
      {children}
    </>
  )
}

export default NicknameSetupForm
