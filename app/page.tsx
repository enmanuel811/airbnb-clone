import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/clientOnly";
import Container from "./components/container";
import EmptyState from "./components/emptyState";
import ListingCard from "./components/listings/listingCard";
import { SafeListing } from "./types";

interface HomeProps{
  searchParams:IListingsParams;
}
const Home = async ({searchParams}: HomeProps)=> {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if(listings.length === 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  //throw new Error("Something went wrong my error");
  return (
   <ClientOnly>
    <Container>
      <div className="
        pt-24
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
          <div>
            {listings.map((listing) => {
              return(
                <ListingCard
                  currentUser = {currentUser}
                  key={listing.id}
                  data={listing}
                />
              )
            })}
          </div>
      </div>
    </Container>
   </ClientOnly>
  )
}

export default Home;
export const dynamic = 'force-dynamic'