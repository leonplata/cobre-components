import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import type { IPaginationProps } from './pagination.types'

export abstract class PaginationBase extends LitElement implements IPaginationProps {

  @property({ type: Number })
  total = 0;

  @property({ type: Number })
  perPage = 10;

  @property({ type: Number })
  max = 5;

  @property({ type: Boolean })
  autoScroll = false;

  @property({ type: Number })
  currentPage = 1;

  private _computePages(totalPages: number, max: number, currentPage: number): number[] {
    const totalRanges = Math.ceil(totalPages / max);
    const currentRange = Math.ceil(currentPage / max);
    const length = currentRange < totalRanges ? max : (totalPages % max) || max;
    return Array.from({ length }).map((_, k) => 1 + k + (currentRange - 1) * max);
  }

  private _computeExistPrevRange(pages: number[] = [], max: number): boolean {
    return pages[0] > max;
  }

  private _computeExistNextRange(currentPage: number, totalPages: number, max: number): boolean {
    const totalRanges = Math.ceil(totalPages / max);
    const currentRange = Math.ceil(currentPage / max);
    return currentRange < totalRanges;
  }

  private _computeSelected(page: number, currentPage: number): boolean {
    return page === currentPage;
  }

  private _pageChange(event: MouseEvent, page: number) {
    event.preventDefault();
    this.currentPage = page;
    const customEvent = new CustomEvent('current-page-changed', { detail: { value: this.currentPage } });
    this.dispatchEvent(customEvent);
  }

  private _goPrevRange(event: MouseEvent, pages: number[]) {
    event.preventDefault();
    const firstPage = pages[0];
    this.currentPage = firstPage - 1;
    const customEvent = new CustomEvent('current-page-changed', { detail: { value: this.currentPage } });
    this.dispatchEvent(customEvent);
  }

  private _goNextRange(event: MouseEvent, pages: number[]) {
    event.preventDefault();
    const lastPage = pages[pages.length - 1];
    this.currentPage = lastPage + 1;
    const customEvent = new CustomEvent('current-page-changed', { detail: { value: this.currentPage } });
    this.dispatchEvent(customEvent);
  }

  private _computeExistPrev(currentPage: number) {
    return currentPage > 1;
  }

  private _computeExistNext(currentPage: number, totalPages: number) {
    return currentPage < totalPages;
  }

  private _goPrev(event: MouseEvent, existPrev: boolean) {
    event.preventDefault();
    if (!existPrev) {
      return;
    }
    this.currentPage -= 1;
    const customEvent = new CustomEvent('current-page-changed', { detail: { value: this.currentPage } });
    this.dispatchEvent(customEvent);
  }

  private _goNext(event: MouseEvent, existNext: boolean) {
    event.preventDefault();
    if (!existNext) {
      return;
    }
    this.currentPage += 1;
    const customEvent = new CustomEvent('current-page-changed', { detail: { value: this.currentPage } });
    this.dispatchEvent(customEvent);
  }

  private _computeTotalPages(total: number, perPage: number) {
    const value = Math.ceil(total / perPage);
    const customEvent = new CustomEvent('total-pages-changed', { detail: { value } });
    this.dispatchEvent(customEvent);
    return value;
  }

  render() {
    const totalPages = this._computeTotalPages(this.total, this.perPage);
    const pages = this._computePages(totalPages, this.max, this.currentPage);
    const existPrev = this._computeExistPrev(this.currentPage);
    const existNext = this._computeExistNext(this.currentPage, totalPages);
    const existPrevRange = this._computeExistPrevRange(pages, this.max);
    const existNextRange = this._computeExistNextRange(this.currentPage, totalPages, this.max);

    return html`
      <ul class="pagination">
        <li class="page-prev disabled-${!existPrev}">
          <a href=""
            @click=${(event: MouseEvent) => this._goPrev(event, existPrev)}>
            <span><slot name="prev"></slot></span>
          </a>
        </li>
        ${existPrevRange ? html`
          <li class="page-prev-range">
            <a href=""
              @click=${(event: MouseEvent) => this._goPrevRange(event, pages)}>
              <span>...</span>
            </a>
          </li>
        `:null}
        ${pages.map(page => html`
          <li class="page-item active-${this._computeSelected(page, this.currentPage)}">
            <a href=""
              @click=${(event: MouseEvent) => this._pageChange(event, page)}>
              <span>${page}</span>
            </a>
          </li>
        `)}
        ${existNextRange ? html`
          <li class="page-next-range">
            <a href=""
              @click=${(event: MouseEvent) => this._goNextRange(event, pages)}>
              <span>...</span>
            </a>
          </li>
        `:null}
        <li class="page-next disabled-${!existNext}">
          <a href=""
            @click=${(event: MouseEvent) => this._goNext(event, existNext)}>
            <span><slot name="next"></slot></span>
          </a>
        </li>
      </ul>
    `;
  }
}

export default PaginationBase;
