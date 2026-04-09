import React from "react";
import bookmarkOn from "../../../assets/bookmark_on.png";

const BookmarksButton = ({ onOpenBookmarks }) => {
  return (
    <div className="list_item bookmarks_button" onClick={onOpenBookmarks}>
      <div className="list_item_icon">
        <img className="bookmarks_button_icon" src={bookmarkOn} alt="" />
      </div>
      <p className="list_item_text">Bookmarks</p>
    </div>
  );
};

export default BookmarksButton;

