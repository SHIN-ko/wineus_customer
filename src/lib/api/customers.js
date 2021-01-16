import qs from 'qs';
import client from './client';

export const registerCustomer = ({ name, contactNumber, address, advancedPayment, extra }) =>
  client.post('/api/customers', { name, contactNumber, address, advancedPayment, extra  });

export const readCustomer = id => client.get(`/api/customers/${id}`);

export const listCustomers = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/customers?${queryString}`);
};

export const updateCustomer = ({ id, name, contactNumber, address, advancedPayment, extra  }) =>
  client.patch(`/api/customers/${id}`, {
    name,
    contactNumber, 
    address, 
    advancedPayment,
    extra 
  });

export const removeCustomer = id => client.delete(`/api/customers/${id}`);
