import format from 'date-fns/format'

/**
 * Date 객체를 받아 YYYY.MM.DD 형태를 반환합니다.
 * TODO: 회의를 통해 날짜는 앞으로 어떻게 포맷팅할 것인지 결정이 필요합니다.
 * @param date
 */
export const formatDate = (date: Date) => {
  return format(date, 'yyyy.MM.dd')
}
