import Link from 'next/link'
import * as S from './Header.style'

export const Header = () => {
  return (
    <S.Header>
      <S.Title>
        <Link href='/'>Point Poker</Link>
      </S.Title>
    </S.Header>
  )
}
