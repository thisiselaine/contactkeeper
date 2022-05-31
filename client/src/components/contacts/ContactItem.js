// Each individual contact in the list will have its own component
import React from 'react';
import PropTypes from 'prop-types';

export const ContactItem = ({ contact }) => {
  const { id, name, email, phone, type } = contact;
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
        <p>
          <button className='btn btn-dark btn-sm'>Edit</button>
          <button className='btn btn-danger btn-sm'>Delete</button>
        </p>
      </ul>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
// NEED THIS STATEMENT
export default ContactItem;
