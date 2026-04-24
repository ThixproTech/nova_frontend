import React, { useState, useEffect } from 'react';

//react-redux
import { connect, useDispatch, useSelector } from 'react-redux';

//react-router-dom
import { NavLink } from 'react-router-dom';

//action
import { getFaQ, deleteFaQ } from '../store/Faq/faq.action';
import { OPEN_FAQ_DIALOG, CLOSE_FAQ_TOAST } from '../store/Faq/faq.type';

//component
import FaqDialog from '../Component/Dialog/FaqDialog';

//Alert
import Swal from 'sweetalert2';
import { warning, alert } from '../util/Alert';

const Faq = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  //useEffect for Get Data
  useEffect(() => {
    dispatch(getFaQ());
  }, [dispatch]);

  const { FaQ, toast, toastData, actionFor } = useSelector(
    (state) => state.FaQ
  );

  //Set Data after Getting
  useEffect(() => {
    setData(FaQ);
  }, [FaQ]);

  //Open Dialog
  const handleOpen = () => {
    dispatch({ type: OPEN_FAQ_DIALOG });
  };

  //Update Dialog
  const handleEdit = (data) => {
    dispatch({ type: OPEN_FAQ_DIALOG, payload: data });
  };

  // delete sweetAlert
  const handleDelete = (faqId) => {
    const data = warning();
    data
      .then((result) => {
        if (result.isConfirmed) {
          props.deleteFaQ(faqId);
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        }
      })
      .catch((err) => console.log(err));
  };

  //toast
  useEffect(() => {
    if (toast) {
      setToast(toastData, actionFor);
      dispatch({ type: CLOSE_FAQ_TOAST });
    }
  }, [toast, toastData, actionFor, dispatch]);

  return (
    <>
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="iq-card">
                <div className="iq-card-body admininfo">
                  <div className="iq-edit-list">
                    <ul className="iq-edit-profile d-flex nav nav-pills">
                      <li className="col-md-6 p-0">
                        <a
                          className="nav-link active"
                          data-toggle="pill"
                          href="#personal-information"
                        >
                          FAQ
                        </a>
                      </li>
                      <li className="col-md-6 p-0">
                        <NavLink
                          to="/admin/help_center/contact_us"
                          className="nav-link"
                          data-toggle="pill"
                        >
                          Contact Us
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 mt-4">
              <div className="row ">
                <div className="iq-header-title d-flex justify-content-between ml-3">
                  <div>
                    <button
                      type="button"
                      className="btn dark-icon btn-primary"
                      data-bs-toggle="modal"
                      id="create-btn"
                      data-bs-target="#showModal"
                      onClick={handleOpen}
                    >
                      <i className="ri-add-line align-bottom me-1 fs-6"></i> Add
                    </button>
                  </div>
                  <FaqDialog />
                </div>
              </div>
              <div className="row help-center-scroll">
                {data.length > 0
                  ? data.map((data, index) => {
                      return (
                        <>
                          <div className="col-md-6 mt-4">
                            <div className="iq-accordion career-style faq-style">
                              <div className="iq-card iq-accordion-block accordion ">
                                <div className="active-faq clearfix">
                                  <div className="container m-0">
                                    <div className="row">
                                      <div className="col-sm-12">
                                        <a
                                          className="accordion-title"
                                          href={() => false}
                                        >
                                          <span> {data?.question} </span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-details">
                                  <p className="mb-0">{data?.answer} </p>
                                </div>
                                <div className="contact-card-buttons d-flex justify-content-end pr-2 pb-1">
                                  <button
                                    type="button"
                                    className="btn iq-bg-primary btn-sm mr-2"
                                    onClick={() => handleEdit(data)}
                                  >
                                    <i
                                      className="ri-pencil-fill"
                                      style={{ fontSize: '19px' }}
                                    />
                                  </button>

                                  <button
                                    type="button"
                                    className="btn iq-bg-primary btn-sm"
                                    onClick={() => handleDelete(data._id)}
                                  >
                                    <i
                                      className="ri-delete-bin-6-line"
                                      style={{ fontSize: '19px' }}
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getFaQ, deleteFaQ })(Faq);
