import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/clientOnly';

import LoginModal from './components/modals/loginModal';
import RegisterModal from './components/modals/registerModal';
import RentModal from './components/modals/rentModal';
import SearchModal from './components/modals/searchModal';

import Navbar from './components/navbar/navbar';
import ToasterProvider from './components/providers/toasterProvider';
import './globals.css'
import {Nunito} from 'next/font/google';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets:["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //we get the current user by definning the getcurrent user in the server defined function
  //we could have that code here because the layout is a server component
  //but it is better to separete the logic
const currentUser = await getCurrentUser();

  /*putting only isOpen will default to true, is equat to put isOpen={true}*/ 
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <SearchModal/>
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar currentUser = {currentUser}/>
        </ClientOnly>
        <div className='pd-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}
