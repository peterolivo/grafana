package definitions

import (
	"github.com/grafana/grafana/pkg/services/ngalert/models"
)

// swagger:route GET /api/provisioning/templates provisioning RouteGetTemplates
//
// Get all message templates.
//
//     Responses:
//       200: []MessageTemplate
//       400: ValidationError

// swagger:route GET /api/provisioning/templates/{name} provisioning RouteGetTemplate
//
// Get a message template.
//
//     Responses:
//       200: MessageTemplate
//       404: NotFound

// swagger:route PUT /api/provisioning/templates/{name} provisioning RoutePutTemplate
//
// Updates an existing template.
//
//     Consumes:
//     - application/json
//
//     Responses:
//       202: Accepted
//       400: ValidationError

// swagger:route DELETE /api/provisioning/templates/{name} provisioning RouteDeleteTemplate
//
// Delete a template.
//
//     Responses:
//       204: Accepted

type MessageTemplate struct {
	Name       string
	Template   string
	Provenance models.Provenance `json:"provenance,omitempty"`
}

type MessageTemplateContent struct {
	Template string
}

// swagger:parameters RoutePutTemplate
type MessageTemplatePayload struct {
	// in:body
	Body MessageTemplateContent
}

func (t *MessageTemplate) ResourceType() string {
	return "template"
}

func (t *MessageTemplate) ResourceID() string {
	return t.Name
}
