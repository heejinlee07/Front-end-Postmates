import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SubHeader from '../Components/Layout/SubHeader';
import SubBanner from '../Components/Layout/SubBanner';
import { openCategories } from '../Modules/MainReducer';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { page, storeUrl, menuList, isOpenCategories } = useSelector(
    (state) => ({
      page: state.Main.page,
      storeUrl: state.Item.store.store_img,
      menuList: state.Item.store.menu,
      isOpenCategories: state.Main.isOpenCategories,
    }),
  );

  const getBackground = () => {
    // eslint-disable-next-line operator-linebreak
    const feedUrl =
      'https://raster-static.postmates.com/?url=https%3A%2F%2Fbuyer-static-gcp.postmates.com%2Fdist%2Fprod%2Fcollection-feed-header-refresh.ff66a93edfd10817d088e6b48bbb80cbedc459960022385bbdf8141e74de7c68c092f2444e22133303ff25dc3e90131d9a4474fd8a4fd1874ca7af56840d0170.jpg&quality=85&w=3200&h=0&mode=auto&format=webp&v=4';
    const url = page === 'feed' ? feedUrl : `http://${storeUrl}`;
    return url;
  };

  const handleClickCategories = () => {
    dispatch(openCategories(!isOpenCategories));
  };

  const generateSubHeader = () => {
    return (
      <>
        <SubBanner page={page} getBackground={getBackground} />
        <SubHeader
          page={page}
          menuList={menuList}
          handleClickCategories={handleClickCategories}
          isOpenCategories={isOpenCategories}
        />
      </>
    );
  };
  return <>{page === 'feed' || page === 'item' ? generateSubHeader() : ''}</>;
};

export default HeaderContainer;
