import {TweenMax} from 'gsap'

export function AnimateItem(item, animation) {
  TweenMax.to(item, animation.duration, animation.properties)
}
