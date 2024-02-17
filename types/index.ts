export interface ExtendedDocument extends Document {
	startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition
}

export interface ViewTransition {
	isFinished: boolean
	ready: boolean
	updateCallbackDone: boolean
}

export interface MetadataProps {
	params: { locale: string }
}

export interface UptimeStatusPage {
	id: string
	type: 'status_page'
	attributes: {
		company_name: string
		company_url: string
		contact_url: string | null
		logo_url: string | null
		timezone: string
		subdomain: string
		custom_domain: string | null
		custom_css: string | null
		google_analytics_id: string | null
		min_incident_length: number
		announcement: string | null
		announcement_embed_visible: boolean
		announcement_embed_css: string
		announcement_embed_link: string
		automatic_reports: boolean
		subscribable: boolean
		hide_from_search_engines: boolean
		password_enabled: boolean
		history: number
		aggregate_state: 'operational' | 'downtime' | 'degraded' | 'maintenance'
		design: 'v1' | 'v2'
		theme: 'light' | 'dark'
		layout: 'vertical' | 'horizontal'
		created_at: string
		updated_at: string
	}
}

export enum StatusColor {
	operational = 'rgb(16,185,129)',
	downtime = 'rgb(248, 113, 113)',
	degraded = 'rgb(245, 158, 11)',
	maintenance = 'rgb(96, 165, 250)'
}

export type NavItems = {
	link: string
	text: keyof IntlMessages['NavItems']
}[]

export interface CountdownTime {
	days: string
	hours: string
	minutes: string
	seconds: string
}

export interface Feature {
	name: keyof IntlMessages['HomePage']['Features']['Titles']
	link: string
	className?: string
}

export interface Session {
	sub: string
	role: 'authenticated'
	user: {
		osu_name: string
		osu_avatar: string
		restricted: string
		discord_id: string
	}
	expires: Date
}

export interface ModalError {
	title: string
	message: string
}
