import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        //console.log(req.body);

        try {
            const params = {
                submit_type: 'pay',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1LNDWiDAJKRmRjNj4xU2Pq10' }, //the shipping rates are created on the stripe dashboard in the products tab
                    { shipping_rate: 'shr_1LNDYcDAJKRmRjNjREVgEn2G' }
                ],
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref; //gets a reference to the image deployed on sanity
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/fznxqetl/production/').replace('-webp', '.webp'); //this gives us access to the image url by replacing some words in the string with words that combine to form a live link hosted on sanity
                    //console.log('Image:', newImage)
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price * 100, //reps cents
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                mode: 'payment',
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/cancel`, //create a canceled page and replace the url
            }
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            //res.redirect(303, session.url);
            res.status(200).json(session);
        } catch (err) {
          res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
        }
}
//export default handler;