import { CardBackground } from './CardBackgrounds.style'
import { fanCoords } from '@/components/DealtCards/DealtCards'

export const CardBackgrounds = () => {
  return (
    <>
      {fanCoords.map((card, index) => {
        return <CardBackground key={index} x={card.x} y={card.y} rotation={card.rotation}></CardBackground>
      })}
    </>
  )
}
