const setCssProperty = property => {
	return (suffix = '') => {
		return (ele = document.documentElement) => {
			return value => {
				ele.style.setProperty(property, value + suffix);
			}
		}
	}
}

export default module = {
	setCssProperty
}