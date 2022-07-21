export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: 'true' //enables cropping of images
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug', //a slug is a unique string that can act as a url
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name', //generates a unique slug based on the name property
                maxLength: 90
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string'
        }
    ]
}