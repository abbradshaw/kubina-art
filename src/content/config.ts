import { defineCollection, z } from 'astro:content';

const workCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		// Validate that the image exists and is an image
		image: image(),
		category: z.enum(['Painting', 'Drawing', 'Sculpture', 'Digital']),
		status: z.enum(['Available', 'Private Collection', 'Sold', 'Museum Collection']).optional(),
		year: z.string(),
		medium: z.string(),
		dimensions: z.string().optional(),
		// Optional: Date added for sorting logic
		date: z.date().optional(),
	}),
});

const pagesCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		image: image(),
		pull_quote: z.string().optional(),
		chapters: z.array(z.object({
			label: z.string(),
			title: z.string(),
			text: z.string(),
			artwork: image().optional(),
			caption: z.string().optional(),
		})).optional(),
	}),
});

export const collections = {
	'work': workCollection,
	'pages': pagesCollection,
};
