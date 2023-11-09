import styled from '@emotion/styled'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode

  onClickRow?: () => void
}

function ListRow({ left, contents, right, onClickRow }: ListRowProps) {
  return (
    <StyledList onClick={onClickRow}>
      {left != null && left}
      {contents}
      {right != null && right}
    </StyledList>
  )
}

const StyledList = styled('li')`
  display: flex;
`

export default ListRow
