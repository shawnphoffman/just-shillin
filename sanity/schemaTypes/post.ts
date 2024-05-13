import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	//
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
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
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
			// validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),
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
