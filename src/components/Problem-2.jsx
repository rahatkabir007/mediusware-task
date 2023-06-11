// import React, { useState } from 'react';
// import ModalA from './ModalA';
// import ModalB from './ModalB';
// import ModalC from './ModalC';

// const Problem2 = () => {
//     const [modalAVisible, setModalAVisible] = useState(false);
//     const [modalBVisible, setModalBVisible] = useState(false);
//     const [modalCVisible, setModalCVisible] = useState(false);

//     const openModalA = () => {
//         setModalAVisible(true);
//     };

//     const openModalB = () => {
//         setModalBVisible(true);
//     };

//     const openModalC = () => {
//         setModalCVisible(true);
//     };

//     const closeModalA = () => {
//         setModalAVisible(false);
//     };

//     const closeModalB = () => {
//         setModalBVisible(false);
//     };

//     const closeModalC = () => {
//         setModalCVisible(false);
//     };

//     return (
//         <div className="container">
//             <div className="row justify-content-center mt-5">
//                 <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

//                 <div className="d-flex justify-content-center gap-3">
//                     <button className="btn btn-lg btn-outline-primary" type="button" onClick={openModalA}>
//                         All Contacts
//                     </button>
//                     <button className="btn btn-lg btn-outline-warning" type="button" onClick={openModalB}>
//                         US Contacts
//                     </button>
//                 </div>

//                 {/* Modal A */}
//                 {modalAVisible && <ModalA />}

//                 {/* Modal B */}
//                 {modalBVisible && <ModalB />}

//                 {/* Modal C */}
//                 {modalCVisible && <ModalC />}
//             </div>
//         </div>
//     );
// };

// export default Problem2;

import React from 'react';
import { Link } from 'react-router-dom';

const Problem2 = () => {
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <Link to="/modalA" className="btn btn-lg btn-outline-primary" type="button">
                        All Contacts
                    </Link>
                    <Link to="/modalB" className="btn btn-lg btn-outline-warning" type="button">
                        US Contacts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Problem2;
