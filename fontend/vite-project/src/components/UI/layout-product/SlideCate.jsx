
const SlideCate = () => {
     return (
          <div
          className="carousel slide slide-list"
          data-bs-ride="carousel"
          id="carouselExampleControls"
     >
          <div className="carousel-inner">
               <div className="carousel-item active">
                    <img
                         alt="..."
                         className="d-block w-100"
                         data-bs-interval="10000"
                         src="https://cdn.tgdd.vn/2024/07/banner/2400-600-6-1920x480.png"
                    />
               </div>
               <div className="carousel-item">
                    <img
                         alt="..."
                         className="d-block w-100"
                         data-bs-interval="3000"
                         src="https://cdn.tgdd.vn/2024/07/banner/2400-600-5-1920x480.png"
                    />
               </div>
          </div>
          <button
               className="carousel-control-prev"
               data-bs-slide="prev"
               data-bs-target="#carouselExampleControls"
               type="button"
          >
               <span
                    aria-hidden="true"
                    className="carousel-control-prev-icon"
               />
               <span className="visually-hidden">
                    Trước
               </span>
          </button>
          <button
               className="carousel-control-next"
               data-bs-slide="next"
               data-bs-target="#carouselExampleControls"
               type="button"
          >
               <span
                    aria-hidden="true"
                    className="carousel-control-next-icon"
               />
               <span className="visually-hidden">
                    Sau
               </span>
          </button>
     </div>
     );
};

export default SlideCate;