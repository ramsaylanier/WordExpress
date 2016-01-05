import gsap from 'gsap';

let PageAnimations = {
	defaults: {
		duration: .5,
		properties: {
			opacity: 1,
			ease: Power4.easeOut
		}
	}
}

PageAnimations.animateIn = {
	duration: PageAnimations.defaults.duration,
	properties: PageAnimations.defaults.properties
}

PageAnimations.animateOut = {
	duration: PageAnimations.defaults.duration,
	properties: {
		opacity: 0,
		ease: Power2.easeOut
	}
}

export default PageAnimations;
