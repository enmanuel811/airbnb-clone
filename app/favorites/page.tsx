import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/clientOnly';
import EmptyState from '../components/emptyState';
import FavoritesClient from './favoritesClient';
import getFavoriteListings from '../actions/getFavoriteListings';

const FavoritesPage = async () => {

const currentUser = await getCurrentUser();
const listings = await getFavoriteListings();


if(!currentUser){
    return(
        <ClientOnly>
            <EmptyState
                title='Unauthorized'
                subtitle='Please login'
            />
        </ClientOnly>
    )

}
if(listings.length === 0){
return (
    <ClientOnly>
       <EmptyState
                title='No favorites found'
                subtitle='Looks like you have no favorite listings'
            />
    </ClientOnly>
  )
}

  return (
    <ClientOnly>
        <FavoritesClient
            listings ={listings}
            currentUser = {currentUser}
        />
    </ClientOnly>
  )
}

export default FavoritesPage