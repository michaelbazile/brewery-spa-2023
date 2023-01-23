# Brewery App

Single Page Application that displays brewery data from different cities.


### Prerequisites

In order to run this app locally, Deno must be installed as the runtime envrionment. Inital set up for that can be found here [here](https://deno.land/manual@v1.29.4/getting_started/installation).


### Run Scripts

From root directory run:
- `deno task start-app` - Start both the server and web application.
- `deno task start-frontend` - Start the web ui only.
- `deno task start-server` - Start the server only.

### External APIs

This app uses the [Cloudinary upload api](https://cloudinary.com/documentation/image_upload_api_reference) to save images. This API requires API keys in order to retrieve data, a guide to setup creds can be found [here](https://cloudinary.com/documentation/how_to_integrate_cloudinary#1_create_your_account_and_set_up_your_product_environment).


