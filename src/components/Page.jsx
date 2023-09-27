import FbIcon from "../assets/FbIcon";
import InstaIcon from "../assets/instagram";
import LinkdinIcon from "../assets/linkedin";

const images = [
  "https://api.asm.skype.com/v1/objects/0-sa-d7-443e8c159435780907f16bfff4026e88/views/imgpsh_fullsize_anim",
  "https://api.asm.skype.com/v1/objects/0-sa-d7-443e8c159435780907f16bfff4026e88/views/imgpsh_fullsize_anim",
  "https://api.asm.skype.com/v1/objects/0-sa-d7-443e8c159435780907f16bfff4026e88/views/imgpsh_fullsize_anim",
  "https://api.asm.skype.com/v1/objects/0-sa-d7-443e8c159435780907f16bfff4026e88/views/imgpsh_fullsize_anim",
];

const propertyInfo = [
  { name: "PROPERTY TYPE:", value: "Apartment/Condo" },
  { name: "YEAR:", value: "2005" },
  { name: "BATHROOMS: ", value: "5" },
  { name: "GROSS TAXES", value: "$101,754" },
  { name: "BEDROOMS:", value: "3" },
  { name: "STRATA MAINT FEE:", value: "$4,59" },
  { name: "LIVING AREA (SQ.FT.): ", value: "6,041" },
  { name: "LISTED BY:", value: "VIRANI REAL ESTATE" },
  {
    name: "SITE INFLUENCES:",
    value:
      "Central Location, Marina Nearby, Recreation Nearby, Shopping Nearby, Waterfront Property",
  },
  {
    name: "AMENITIES:",
    value: "Air Cond./Central, Elevator, Recreation Center, Concierge",
  },
];
const PrintDetails = () => {
  return (
    <div>
      <div className="p-8">
        <div className=" h-64 relative">
          <img
            className="w-full h-full "
            src="https://api.asm.skype.com/v1/objects/0-sa-d7-443e8c159435780907f16bfff4026e88/views/imgpsh_fullsize_anim"
            alt="Head Image"
          />
          <img
            src="https://api.asm.skype.com/v1/objects/0-sa-d2-06d080693d6109f9eb98156facae9803/views/imgpsh_fullsize_anim"
            alt="Logo"
            className="absolute top-4 right-4 w-16 h-16"
          />
        </div>
        <div className="flex items-center justify-between h-20">
          <p1 className="text-4xl font-bold">$19,988,000 </p1>
          <button className="bg-c0902c border-2 border-667DD1 rounded-none text-white px-4 h-10 text-xl">
            VIEW DETAILS
          </button>
        </div>
        <div>
          <p>PH4201 1077 W CORDOVA STREET | VANCOUVER WEST | COAL HARBOUR</p>
        </div>
        <div className="w-full mt-4">
          <div className="flex">
            <div className="w-1/2 mr-2 h-42">
              <img
                src="https://api.asm.skype.com/v1/objects/0-sa-d7-443e8c159435780907f16bfff4026e88/views/imgpsh_fullsize_anim"
                alt="Image 1"
                className="w-full h-auto"
              />
            </div>
            <div className="w-1/2 ml-2 h-42">
              <img
                src="https://api.asm.skype.com/v1/objects/0-sa-d7-443e8c159435780907f16bfff4026e88/views/imgpsh_fullsize_anim"
                alt="Image 2"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        <div className=" mt-4 ">
          <p className="text-131523">
            ROGERS TOWER PENTHOUSE formerly Shaw Tower - Experience luxury
            living in this one-of-a-kind spanning the entire 42nd floor.
            Boasting 6,041sf of opulent interior living & 2,100sf of
            breathtaking exterior w/ panoramic views of Coal Harbour, Stanley
            Park, English Bay, & North Shore Mountains. Custom-designed by
            Robert Ledingham, featuring a chef's kitchen, radiant limestone
            floors, limestone gas fireplaces, a primary suite with dream closet,
            home theatre & home automation. 4 parking stalls & a private storage
            room. The expansive balconies include a private hot tub & built in
            BBQ. Enjoy hotel like amenities including 24-hour concierge,
            high-end gym, boardroom, and theatre. Located among amazing
            restaurants and boutiques. An opportunity to own the most stunning
            waterfront home in Vancouver!
          </p>
        </div>
        <div className="h-96"></div>

        <div className="flex flex-wrap">
          {images.map((item, index) => {
            return (
              <div
                key={index}
                className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-2"
              >
                <img src={item} alt="Image 1" className="w-full h-auto" />
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap">
          {propertyInfo.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-wrap flex-shrink-0 md:flex-grow  w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-3"
              >
                <div className=" w-1/2 text-70747B">{item.name}</div>
                <div className=" w-1/2  text-131523">
                  <p>{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end p-4">
          <button className="bg-c0902c border-2 border-667DD1 rounded-none text-white px-4 h-10 text-xl">
            VIEW MORE LISTINGS
          </button>
        </div>
      </div>
      <footer
        style={{ position: "fixed", bottom: "0", width: "100%" }}
        className=" bg-667DD1"
      >
        <div className="flex justify-around py-4">
          <div className="flex">
            <img
              className="h-16 w-16"
              src="https://api.asm.skype.com/v1/objects/0-sa-d3-cb67c0b69ce3394daa18464037882d1e/views/imgpsh_fullsize_anim"
              alt="QR-image"
            />
          </div>
          <div>
            <div className="text-white text-sm mt-2">
              LISTED BY KARIM VIRANI
            </div>
            <div className="text-slate-100 text-[10px] mt-2">
              VIRANI REAL ESTATE ADVISORS
            </div>
          </div>
          <div>
            <div className="text-white text-sm mt-2 font-bold">604.695.1000</div>
            <div className="flex gap-4">
              <span className="text-slate-100 text-[10px] mt-2">VANCOUVER</span>
              <span className="text-slate-100 text-[10px] mt-2">SEATTLE</span>
            </div>
          </div>
          <div>
            <div className="text-white text-sm mt-2 font-bold">WWW.VIRANI.CA</div>
            <div className="flex gap-4">
              <span className="text-slate-100 text-[10px] mt-2">LONDON</span>
              <span className="text-slate-100 text-[10px] mt-2">BEIJING</span>
            </div>
          </div>
          <div className="flex justify-center items-center h-16 gap-3">
            <FbIcon></FbIcon>
            <InstaIcon></InstaIcon>
            <LinkdinIcon></LinkdinIcon>
          </div>
        </div>
        <div className="flex justify-around py-4">
          <p className="text-slate-100 text-[6px] mt-2">
            109-1500 Howe Street, Vancouver, BC Canada V6Z 2N1. VIRANI REAL
            ESTATE ADVISORS is a division of VIRANI Holdings Ltd. This is not an
            offering for sale. Any such offering can only be made by way of
            Disclosure Statement. E.&O.E. CopyrightÂ® 2023 VIRANI REAL ESTATE
            ADVISORS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrintDetails;
