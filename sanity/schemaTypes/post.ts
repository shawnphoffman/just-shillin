import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'post',
	title: 'Post',
	icon: DocumentTextIcon,
	type: 'document',
	//
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: rule => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
			},
			validation: rule => rule.required(),
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: { type: 'author' },
		}),
		defineField({
			name: 'mainImage',
			title: 'Main image',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative Text',
				},
			],
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			description: 'What podcasts is this relevant to? If one is not selected, the post will not be visible in the feeds.',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
			// validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
		}),
		// defineField({
		//   name: 'excerpt',
		//   title: 'Excerpt',
		//   type: 'text',
		// }),
	],
	//
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'mainImage',
			category: 'categories.0.title',
		},
		prepare(selection) {
			const { author, category } = selection
			return { ...selection, subtitle: author && `${category || 'None'} - ${author}` }
		},
	},
	//
	orderings: [
		{
			title: 'Published At, New',
			name: 'publishedAtDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
	],
})
