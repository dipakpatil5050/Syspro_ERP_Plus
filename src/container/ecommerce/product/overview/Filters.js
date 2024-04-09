import React, { useState } from 'react';
import UilSlidersV from '@iconscout/react-unicons/icons/uil-sliders-v';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
// import { Slider } from '../../../../components/slider/slider';
import { CheckboxGroup } from '../../../../components/checkbox/checkbox';
import { Sidebar, SidebarSingle } from '../../Style';
// import {
//   filterByPriceRange,
//   filterByRating,
//   filterByBrand,
//   filterByCategory,
// } from '../../../../redux/product/actionCreator';

const Filters = React.memo(() => {
  const [state, setState] = useState({
    min: 0,
    max: 1500,
  });

  console.log(state);
  console.log(setState);
  //   const dispatch = useDispatch();

  // const { min, max } = state;
  // const onChange = (value) => {
  //   setState({
  //     ...state,
  //     min: value[0],
  //     max: value[1],
  //   });
  // dispatch(filterByPriceRange(value));
  // };
  // const onChangeRating = (checkValue) => {
  //   // dispatch(filterByRating([checkValue]));
  //   console.log(checkValue);
  // };
  const onChangeBrand = (checkValue) => {
    // dispatch(filterByBrand([checkValue]));
    console.log(checkValue);
  };

  const optionsBrand = [
    {
      label: (
        <>
          Product 1 <span className="brand-count">25</span>
        </>
      ),
      value: 'cup',
    },
    {
      label: (
        <>
          Product 2 <span className="brand-count">25</span>
        </>
      ),
      value: 'plate',
    },
  ];

  // const onChangeCategory = (value) => {
  //   dispatch(filterByCategory(value));
  // };

  return (
    <Sidebar>
      <Cards
        title={
          <span>
            <UilSlidersV />
            Filters
          </span>
        }
      >
        {/* <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Price Range</Heading>
          <Slider max={1500} onChange={onChange} range defaultValues={[min, max]} />
          <p className="ninjadash-price-text">
            ${min} - ${max}
          </p>
        </SidebarSingle> */}
        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Category</Heading>

          <nav>
            <ul className="ninjadash-category-list">
              <li>
                {/* onClick={() => onChangeCategory('all')} */}
                <Link to="#">
                  <span>All</span>
                  <span className="ninjadash-category-count">25</span>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <span>Unstich Lehanga</span>
                  <span className="ninjadash-category-count">25</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="sidebar-single__action">
            <Link className="btn-seeMore" to="#">
              See more
            </Link>
          </div>
        </SidebarSingle>

        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Brands</Heading>
          <CheckboxGroup options={optionsBrand} onChange={onChangeBrand} />

          <div className="sidebar-single__action">
            <Link className="btn-seeMore" to="#">
              See more ...
            </Link>
          </div>
        </SidebarSingle>
      </Cards>
    </Sidebar>
  );
});

export default Filters;
