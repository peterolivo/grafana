// Libraries
import React, { memo } from 'react';

import { AnnotationQuery } from '@grafana/data';

// Types
import { LokiQuery } from '../types';

import { LokiOptionFields } from './LokiOptionFields';
import { LokiQueryField } from './LokiQueryField';
import { LokiQueryEditorProps } from './types';

type Props = LokiQueryEditorProps & {
  annotation?: AnnotationQuery<LokiQuery>;
  onAnnotationChange?: (annotation: AnnotationQuery<LokiQuery>) => void;
};

export const LokiAnnotationsQueryEditor = memo(function LokiAnnotationQueryEditor(props: Props) {
  const annotation = props.annotation!;
  const onAnnotationChange = props.onAnnotationChange!;

  const onChangeQuery = (query: LokiQuery) => {
    onAnnotationChange({
      ...annotation,
      expr: query.expr,
      maxLines: query.maxLines,
      instant: query.instant,
      queryType: query.queryType,
    });
  };

  const queryWithRefId: LokiQuery = {
    refId: '',
    expr: annotation.expr,
    maxLines: annotation.maxLines,
    instant: annotation.instant,
    queryType: annotation.queryType,
  };
  return (
    <>
      <div className="gf-form-group">
        <LokiQueryField
          datasource={props.datasource}
          query={queryWithRefId}
          onChange={onChangeQuery}
          onRunQuery={() => {}}
          onBlur={() => {}}
          history={[]}
          ExtraFieldElement={
            <LokiOptionFields
              lineLimitValue={queryWithRefId?.maxLines?.toString() || ''}
              resolution={queryWithRefId.resolution || 1}
              query={queryWithRefId}
              onRunQuery={() => {}}
              onChange={onChangeQuery}
            />
          }
        />
      </div>

      <div className="gf-form-group">
        <h5 className="section-heading">
          Field formats
          {/* <span>
            For title and text fields, use either the name or a pattern. For example, [[ instance ]] is replaced with
            label value for the label instance.
          </span> */}
        </h5>
        <div className="gf-form-inline">
          <div className="gf-form">
            <span className="gf-form-label width-5">Title</span>
            <input
              type="text"
              className="gf-form-input max-width-9"
              value={annotation.titleFormat}
              onChange={(event) => {
                onAnnotationChange({
                  ...annotation,
                  titleFormat: event.currentTarget.value,
                });
              }}
              placeholder="alertname"
            ></input>
          </div>
          <div className="gf-form">
            <span className="gf-form-label width-5">Tags</span>
            <input
              type="text"
              className="gf-form-input max-width-9"
              value={annotation.tagKeys}
              onChange={(event) => {
                onAnnotationChange({
                  ...annotation,
                  tagKeys: event.currentTarget.value,
                });
              }}
              placeholder="label1,label2"
            ></input>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form">
              <span className="gf-form-label width-5">Text</span>
              <input
                type="text"
                className="gf-form-input max-width-9"
                value={annotation.textFormat}
                onChange={(event) => {
                  onAnnotationChange({
                    ...annotation,
                    textFormat: event.currentTarget.value,
                  });
                }}
                placeholder="instance"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
