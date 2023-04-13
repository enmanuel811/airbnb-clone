
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/clientOnly';
import EmptyState from '@/app/components/emptyState';
import React from 'react'
import ListingClient from './listingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams{
    listingId?:string;
}
//this is a server component so we cant use hoooks in here
const ListingPage = async({params}:{params:IParams}) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();
    
    if(!listing){
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ListingClient
            listing={listing}
            reservations={reservations}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ListingPage