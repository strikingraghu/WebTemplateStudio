import * as React from "react";
import { FormattedMessage } from "react-intl";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import DraggableSidebarItem from "../DraggableSidebarItem";
import SummaryTile from "../SummaryTile";

import styles from "./styles.module.css";

import cancel from "../../assets/cancel.svg";
import reorder from "../../assets/reorder.svg";
import getSvgUrl, { withLocalPath } from "../../utils/getSvgUrl";
import { ISelected } from "../../types/selected";

const SortableSidebarItem = SortableElement(
  ({
    page,
    idx,
    handleInputChange,
    handleCloseClick
  }: {
    page: any;
    idx: number;
    handleInputChange: any;
    handleCloseClick?: (idx: number) => void;
  }) => {
    return (
      <DraggableSidebarItem
        page={page}
        closeSvgUrl={withLocalPath(cancel)}
        pageSvgUrl={getSvgUrl(page.internalName)}
        reorderSvgUrl={withLocalPath(reorder)}
        handleInputChange={handleInputChange}
        handleCloseClick={handleCloseClick}
        idx={idx + 1}
      />
    );
    // use idx+1 to prevent falsiness of 0th value
  }
);

const SortableSummaryTile = SortableElement(
  ({
    page,
    idx,
    handleInputChange,
    handleCloseClick,
    error
  }: {
    page: any;
    idx: number;
    handleInputChange: any;
    handleCloseClick?: (idx: number) => void;
    isDraggable?: boolean;
    error?: string | FormattedMessage.MessageDescriptor;
  }) => {
    return (
      <React.Fragment>
        <div className={styles.tileContainer}>
          <SummaryTile
            originalTitle={page.id}
            title={page.title}
            version="v1.0"
            svgUrl={page.svgUrl}
            isEditable={true}
            author={page.author}
            handleCloseClick={handleCloseClick}
            handleInputChange={handleInputChange}
            idx={idx + 1}
            isDraggable={true}
            error={error}
          />
        </div>
      </React.Fragment>
    );
  }
);

/**
 * A component that produces sortable pages to be displayed on the sidebar or in the summary page.
 */
const SortableList = SortableContainer(
  ({
    pages,
    pagesRows,
    handleInputChange,
    handleCloseClick
  }: {
    pages: ISelected[];
    pagesRows?: any[];
    handleInputChange: any;
    handleCloseClick?: (idx: number) => void;
  }) => {
    return (
      <div>
        <div className={styles.sidebarItem}>
          {!pagesRows &&
            pages.map((page: any, idx: number) => {
              return (
                <SortableSidebarItem
                  key={page.id}
                  index={idx}
                  idx={idx}
                  page={page}
                  handleInputChange={handleInputChange}
                  handleCloseClick={handleCloseClick}
                />
              );
            })
          // index prop required by react-sortable, while idx used for updating redux state changes
          }
        </div>
        {pagesRows &&
          pagesRows.map((page: any, idx: number) => {
            return (
              <SortableSummaryTile
                key={`item-${page.id}`}
                index={idx}
                idx={idx}
                page={page}
                handleInputChange={handleInputChange}
                handleCloseClick={handleCloseClick}
                error={pages[idx].error}
              />
            );
          })}
      </div>
    );
  }
);

export default SortableList;