import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }
  function refreshPage(){
    window.location.reload();
} 

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {hotel.name}
              <div className="text-xs font-normal">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            {hotel.bookings.map((booking) => (
              <div>
                <div>
                  <span className="font-bold mr-2">Dates: </span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Guests:</span>
                  <span>
                    {booking.adultCount} adults, {booking.childCount} children
                  </span>
                </div>
              </div>
            ))}
          </div>
          <form>
          <h1 className="text-3xl font-bold">Modify Reservation</h1>
  <label>Extend reservation by number of days:</label>
  <input type="text" id="fname" name="fname"></input><br></br>
  <label>Number of guests (Adults):</label><br></br>
  <input type="text" id="lname" name="lname"></input>
  <label>Number of guests (Children):</label><br></br>
  <input type="text" id="lname" name="lname"></input>
</form>  <button
      onClick={refreshPage}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
    >
      Cancel Reservation
    </button>

    <button
      onClick={refreshPage}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
    >
      Modify Reservation
    </button>
        </div>
      ))}
      
    </div>
  );
};

export default MyBookings;
