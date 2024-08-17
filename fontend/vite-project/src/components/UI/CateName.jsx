import PropTypes from 'prop-types';

const CateName = (props) => {

     return (
          <div>
               <a
                    className="d-flex justify-content-center text-decoration-none"
                    href=""
               >
                    <img
                         alt=""
                         className="logo-apple"
                         src='/img/apple.svg'
                    />
                    <h2 className="desc-list">
                         {props.children}
                    </h2>
               </a>
          </div>
     );
};

CateName.propTypes = {
     data: PropTypes.string.isRequired,
 };

export default CateName;