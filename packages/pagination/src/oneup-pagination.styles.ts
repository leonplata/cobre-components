import { css } from 'lit';

export const styles = [
  css`
    :host {
      display: block;
      text-align: center;
      margin: 40px auto;
      --item-font-family: "Roboto", serif;
      --active-color: #ff462e;
    }
    .pagination {
      display: inline-block;
      padding-left: 0;
      margin: 20px 0;
      border-radius: 4px
    }
    .pagination>li {
      display: inline
    }
    .pagination>li>a,
    .pagination>li>span {
      position: relative;
      float: left;
      padding: 6px 12px;
      margin-left: -1px;
      line-height: 1.42857143;
      color: #337ab7;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid #ddd
    }
    .pagination>li:first-child>a,
    .pagination>li:first-child>span {
      margin-left: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px
    }
    .pagination>li:last-child>a,
    .pagination>li:last-child>span {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px
    }
    .pagination>li>a:focus,
    .pagination>li>a:hover,
    .pagination>li>span:focus,
    .pagination>li>span:hover {
      z-index: 2;
      color: #23527c;
      background-color: #eee;
      border-color: #ddd
    }
    .pagination>.active-true>a,
    .pagination>.active-true>a:focus,
    .pagination>.active-true>a:hover,
    .pagination>.active-true>span,
    .pagination>.active-true>span:focus,
    .pagination>.active-true>span:hover {
      z-index: 3;
      color: #fff;
      cursor: default;
      background-color: #337ab7;
      border-color: #337ab7
    }
    .pagination>.disabled-true>a,
    .pagination>.disabled-true>a:focus,
    .pagination>.disabled-true>a:hover,
    .pagination>.disabled-true>span,
    .pagination>.disabled-true>span:focus,
    .pagination>.disabled-true>span:hover {
      color: #777;
      cursor: not-allowed;
      background-color: #fff;
      border-color: #ddd
    }
    .pagination-lg>li>a,
    .pagination-lg>li>span {
      padding: 10px 16px;
      font-size: 18px;
      line-height: 1.3333333
    }
    .pagination-lg>li:first-child>a,
    .pagination-lg>li:first-child>span {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px
    }
    .pagination-lg>li:last-child>a,
    .pagination-lg>li:last-child>span {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px
    }
    .pagination-sm>li>a,
    .pagination-sm>li>span {
      padding: 5px 10px;
      font-size: 12px;
      line-height: 1.5
    }
    .pagination-sm>li:first-child>a,
    .pagination-sm>li:first-child>span {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px
    }
    .pagination-sm>li:last-child>a,
    .pagination-sm>li:last-child>span {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px
    }
    .pagination-container {
      text-align: center;
      margin: 40px auto;
    }
    .pagination {
      text-align: center;
      display: inline-block;
      margin: 0;
      clear: both;
      vertical-align: top;
      width: auto;
    }
    .pagination li {
      text-align: center;
      float: none;
    }
    .pagination li.disabled-true > a,
    .pagination li.disabled-true > a:hover {
      background: none;
    }
    .pagination li:first-child > a,
    .pagination li:last-child > a {
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border-radius: 100%;
    }
    .pagination li a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      display: -webkit-inline-flex;
      -webkit-align-items: center;
      -webkit-justify-content: center;
      -webkit-flex-direction: row;
      -ms-flex-align: center;
      -ms-flex-direction: row;
      margin: 0 5px;
      font-family: var(--item-font-family);
      font-size: 14px;
      font-weight: normal;
      height: 46px;
      width: 46px;
      text-align: center;
      background: none;
      color: var(--active-color);
      vertical-align: middle;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border-radius: 100%;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
      border: none;
    }
    @media screen and (max-width: 991px) {
      .pagination li a {
        height: 30px;
        width: 30px;
      }
    }
    @media screen and (max-width: 767px) {
      .pagination li a {
        height: 25px;
        width: 25px;
        font-size: 13px;
      }
    }
    .pagination li a .glyphicon {
      top: 0;
    }
    .pagination li a:hover {
      background: #2A2421;
      color: white;
    }
    .pagination li:last-child a {
      margin-right: 0;
    }
    .pagination li.active-true a,
    .pagination li.active-true a:active,
    .pagination li.active-true a:focus,
    .pagination li.active-true a:hover,
    .pagination li.active-true:hover a,
    .pagination li.active-true:hover a:active,
    .pagination li.active-true:hover a:focus,
    .pagination li.active-true:hover a:hover {
      background: var(--active-color);
      border-color: var(--active-color);
      color: white;
    }
  `,
];
