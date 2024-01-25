'use client'

import Linkify from 'react-linkify'

export default function Summary({ summary }) {
	return <Linkify>{summary}</Linkify>
}
