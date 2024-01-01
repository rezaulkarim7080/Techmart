import React from 'react'

const Faq = () => {
	return (
		<div>

			<h1 className='text-4xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 py-10'>These are some of the Frequently Asked Question
			</h1>
			<div>
				<section >
					<div className=" flex flex-col justify-center px-4 py-8 mx-auto md:p-8">

						<div className="space-y-4">
							<details className="w-full border rounded-lg">
								<summary className="px-4 py-6 ">What are the options of buying Brand New Laptop?</summary>
								<p className="px-4 py-6  text-gray-400">You can buy our courses using any bank. You can also pay using paypal,  visa card, master card. </p>
							</details>
							<details className="w-full border rounded-lg">
								<summary className="px-4 py-6 ">how Can I Login ?</summary>
								<p className="px-4 py-6  text-gray-400">You Can Login directly with your Gmail and Email. You can also login with your email and password if you registered. </p>
							</details>
							<details className="w-full border rounded-lg">
								<summary className="px-4 py-6 ">Will There Be Any New Products Added ?</summary>
								<p className="px-4 py-6  text-gray-400">Yes, we are constantly trying to more Colourful Laptops.Our team is working hard bring them to you; </p>
							</details>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default Faq