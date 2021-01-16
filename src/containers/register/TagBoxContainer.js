import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagBox from '../../components/register/TagBox';
import { changeField } from '../../modules/register';

const TagBoxContainer = () => {
  const dispatch = useDispatch();
  const extra = useSelector(state => state.register.extra);

  const onChangeTags = nextTags => {
    dispatch(
      changeField({
        key: 'extra',
        value: nextTags,
      }),
    );
  };

  return <TagBox onChangeTags={onChangeTags} extra={extra} />;
};

export default TagBoxContainer;
