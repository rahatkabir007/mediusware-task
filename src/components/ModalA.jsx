import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ModalC from './ModalC';

const ModalA = () => {
    const [onlyEven, setOnlyEven] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const modalContentRef = useRef(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    useEffect(() => {
        filterContacts();
    }, [onlyEven, searchText]);

    useEffect(() => {
        if (modalContentRef.current) {
            modalContentRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (modalContentRef.current) {
                modalContentRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const fetchContacts = () => {
        const url = `https://contact.mediusware.com/api/contacts/?page=${page}`;
        setLoading(true);

        axios
            .get(url)
            .then((response) => {
                setContacts((prevContacts) => [...prevContacts, ...response.data.results]);
                setPage((prevPage) => prevPage + 1);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const filterContacts = () => {
        let filteredContacts = contacts;

        if (onlyEven) {
            filteredContacts = filteredContacts.filter((contact) => contact.id % 2 === 0);
        }

        if (searchText) {
            const encodedSearchText = encodeURIComponent(searchText);
            const url = `https://contact.mediusware.com/api/contacts/?search=${encodedSearchText}`;

            axios
                .get(url)
                .then((response) => {
                    setContacts(response.data.results);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            fetchContacts();
        }
    };

    const handleCheckboxChange = () => {
        setOnlyEven(!onlyEven);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            filterContacts();
        }
    };

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
    };

    const handleClose = () => {
        navigate('/problem-2');
    };

    const handleScroll = () => {
        const modalContent = modalContentRef.current;

        if (modalContent.scrollTop + modalContent.clientHeight === modalContent.scrollHeight) {
            fetchContacts();
        }
    };

    return (
        <>
            {selectedContact && <ModalC contact={selectedContact} onClose={() => setSelectedContact(null)} />}
            <div className="modal-backdrop fade show" style={{ zIndex: '1050' }}></div>
            <div className="modal fade show" style={{ display: selectedContact ? 'none' : 'block', zIndex: '1051' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content" ref={modalContentRef}>
                        <div className="modal-header">
                            <div className="d-flex flex-column row-gap-3 justify-content-start w-100">
                                <div>
                                    <h3 className="modal-title">All Contacts</h3>
                                </div>

                                <div className="d-flex column-gap-2 justify-content-between align-items-center ">
                                    <div className="d-flex column-gap-2">
                                        <Link
                                            to="/modalA"
                                            className="btn btn-primary"
                                            style={{ backgroundColor: '#46139f', borderColor: '#46139f', fontSize: '20px' }}
                                        >
                                            All Contacts
                                        </Link>
                                        <Link
                                            to="/modalB"
                                            className="btn btn-warning"
                                            style={{ backgroundColor: '#ff7150', borderColor: '#ff7150', color: '#fff', fontSize: '20px' }}
                                        >
                                            US Contacts
                                        </Link>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={handleClose}
                                            style={{ backgroundColor: '#fff', borderColor: '#46139f', color: '#000', fontSize: '20px' }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body d-flex flex-column row-gap-3" style={{ padding: '2rem 3rem' }}>
                            <div className="d-flex align-items-center mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleSearchKeyDown}
                                    style={{ fontSize: '20px' }}
                                />
                            </div>
                            {contacts.map((contact) => (
                                <div key={contact.id} className="d-flex flex-column row-gap-2">
                                    <div>
                                        <span onClick={() => handleContactClick(contact)} style={{ fontSize: '21px', cursor: 'pointer' }}>
                                            Contact: {contact.phone}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {loading && <div>Loading...</div>}
                        </div>
                        <div className="modal-footer d-flex column-gap-2 align-items-center justify-content-start mx-4 mb-2">
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={onlyEven}
                                    onChange={handleCheckboxChange}
                                    id="onlyEvenCheckbox"
                                    style={{ fontSize: '20px' }}
                                />
                                <label style={{ fontSize: '20px' }} className="form-check-label" htmlFor="onlyEvenCheckbox">
                                    Only even
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalA;
