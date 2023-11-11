import styled from '@emotion/styled'

interface ListItemProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode

  onClickRow?: () => void
}

// TODO: 희지 디자인 나온 후, 형태 바꾸기
function ListItem({ left, contents, right, onClickRow }: ListItemProps) {
  return (
    <StyledList onClick={onClickRow}>
      {left != null && left}
      {contents}
      {right != null && right}
    </StyledList>
  )
}

interface ListItemTextProps {
  text: string
}

function ListItemText({ text }: ListItemTextProps) {
  return <span>{text}</span>
}

ListItem.ListItemText = ListItemText

export default ListItem

const StyledList = styled('li')`
  display: flex;
`
