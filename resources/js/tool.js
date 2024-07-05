import Tool from './pages/Tool'

Nova.booting((app, store) => {
	Nova.inertia('FixedMenu', Tool)

	window.onload = () => {
		console.log('loaded')

		initStickySidebar()
		initResponsiveTable()

		initFloatingAction()
	}
})

function initStickySidebar() {
	const sidebar = document.querySelectorAll('.sidebar-menu')[1]

	const heider_height = document.querySelector('header').offsetHeight
	const window_height = window.innerHeight
	const sidebar_height = window_height - heider_height

	sidebar.style.height = `${sidebar_height}px`
	sidebar.style.width = `250px`
}

function initResponsiveTable() {
	// Nova using ajax to call table, so need observer
	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			// Table height
			const table = document.querySelector('[data-testid="resource-table"]')
			if (table) {
				if (table.classList.contains('sticky-applied')) return

				const table_wrapper = table.parentElement
				table_wrapper.style.maxHeight = '60vh'
				table_wrapper.style.overflowY = 'scroll'
				table.classList.add('sticky-applied')
			}

			// Sticky header
			const thead = document.querySelector('thead')
			if (thead) {
				if (thead.classList.contains('sticky-applied')) return

				thead.style.position = 'sticky'
				thead.style.top = 0
				thead.style.zIndex = 10
				thead.classList.add('sticky-applied')
			}
		})
	})
	observer.observe(document.body, { childList: true, subtree: true })
}

function initFloatingAction() {
	// Only make floating in details page
	if (isDetailPage()) {
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				let action_header = document.querySelector('div[resource]')
				const wrapper = action_header.parentElement.parentElement.parentElement
				
				if (wrapper) {
					window.addEventListener('scroll', () => changeBackground(wrapper))
					if (wrapper.classList.contains('action-sticky')) return

					wrapper.style.position = 'sticky'
					wrapper.style.top = '10px'
					wrapper.classList.add('action-sticky')

					const observer = new IntersectionObserver(callback, {threshold: 0});
				} else {
					console.log('No action <div> found.');
				}
			})
		})
		observer.observe(document.body, { childList: true, subtree: true })	
	} 
}

function isDetailPage() {
	const url = window.location.href
	const regex = /\/resources\/[^\/]+\/\d+$/
	
	console.log('1');
	return regex.test(url)
}

function changeBackground(wrapper) {
	if (wrapper.getBoundingClientRect().bottom > 0 && wrapper.getBoundingClientRect().top < document.documentElement.clientHeight) {
		wrapper.classList.add('bg-slate-500');
	} else {
		wrapper.classList.remove('bg-slate-500');
	}
}