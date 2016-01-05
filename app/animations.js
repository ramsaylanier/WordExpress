export function AnimateItem(item, animation){
	TweenMax.to(item, animation.duration, animation.properties)
}
