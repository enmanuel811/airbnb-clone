import prisma from "@/app/libs/prismadb"

interface IParams{
    listingId?:string;
    userId?:string;
    authorId?:string;
}


export default async function getReservations(
    params:IParams
){
    try{

    const {listingId,userId,authorId} = params;

    const query: any ={}
    //we search for the specific listing
    if(listingId){
        query.listingId = listingId;
    }
    //we search for the reservations made to our properties
    if(userId){
        query.userId = userId;

    }
    //we search for other reservations that users made
    if(authorId){
        query.listing ={userId: authorId}
    }

    const reservations = await prisma.reservation.findMany({
        where:query,
        include:{
            listing:true
        },
        orderBy:{
            createdAt:'desc'
        }
    })

    const safeReservations = reservations.map(
        (reservation) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
      }));


    return safeReservations;
} catch(error:any){
    throw new Error(error);
}
}