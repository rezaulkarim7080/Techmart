
![Logo](https://techmart-delta.vercel.app/static/media/footer.874b2e3d55a7a9d4ede5.png)


# Techmart

Tech Sale Product Based MERN Project


## Live Site URL

https://techmart-delta.vercel.app/

## Project youtube video

https://www.youtube.com/watch?v=KD2S4UaRJQU


## Features

- There are Two types of users- Admin  Buyer/User.The user registers using name,image, email and password their role is set as buyer/user.Jwt verification and private route is implemented.

- Users Details are saved during registration in mongoDB database with node.js.Buyers/Users can reset password with email.
- Custom Hook is created to check user roles from the database. If the user is Admin,He can Update delete buyer/user .Admin can turn buyer/user to admin.

- Buyer/User can place order an item which will save in the OdersCollection of mongoBD after payment complete by Buyers/Users. Payment Method is implemented using Braintree | Online Payment.  Admin can Create an Product.Admin also can delete,Update  The Products. Admin can also advertise The New Products which will be shown in the advertisement section of the home page.

- Admin can create dynamic category. create Products category wise.buyers/users can find,  fitler & search similler products category wise.


## Tech Stack

**Client:** HTML5, HTML, React.js, Git, JavaScript, Web Development, React.js, TailwindCSS

**Server:** MongoDB, Node, Express.js
