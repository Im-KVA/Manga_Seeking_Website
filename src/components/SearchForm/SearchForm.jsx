import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchForm.css";

import meter1 from "../../assets/meter1.svg";
import meter2 from "../../assets/meter2.svg";
import meter3 from "../../assets/meter3.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import arrow1 from "../../assets/arrow1.svg";
import arrow2 from "../../assets/arrow2.svg";
import colorSharp from "../../assets/color-sharp.png";
import colorSharp2 from "../../assets/color-sharp2.png";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="SF-container">
      <section className="skill" id="skills">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="skill-bx wow zoomIn">
                <h2>Tìm những bộ truyện tranh và tiểu thuyết yêu thích của bạn!</h2>
                <p>
                  Khám phá ngay kho truyện tranh với đủ thể loại đa dạng!!
                  <br></br> Nhập tên truyện, tên tác giả hoặc thể loại để bắt
                  đầu tìm kiếm.
                </p>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  className="owl-carousel owl-theme skill-slider"
                >
                  <div className="item">
                    <img src={meter1} alt="Image" />
                    <h5>Người dùng hài lòng</h5>
                  </div>
                  <div className="item">
                    <img src={meter2} alt="Image" />
                    <h5>Đánh giá tích cực</h5>
                  </div>
                  <div className="item">
                    <img src={meter3} alt="Image" />
                    <h5>Tìm kiếm thành công</h5>
                  </div>
                  <div className="item">
                    <img src={meter1} alt="Image" />
                    <h5>Tác giả truyện tin dùng</h5>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      <img className="background-image-left" src={colorSharp} alt="Image" />
      <img className="background-image-right" src={colorSharp2} alt="Image" />

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập từ khóa và bắt đầu tìm kiếm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Tìm kiếm</button>
      </form>
    </div>
  );
};

export default SearchForm;
