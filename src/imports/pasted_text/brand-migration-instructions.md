UPDATE THE EXISTING SITE — BRAND MIGRATION ONLY

I am updating the existing AgentSentry website and interactive demo to the new product name:

VetoPlane

TAGLINE:
THE EXECUTION CONTROL PLANE FOR AUTONOMOUS AI

IMPORTANT:
I have attached the new VetoPlane logo. USE THE ATTACHED LOGO AS THE AUTHORITATIVE BRAND ASSET.

DO NOT GENERATE A NEW LOGO.
DO NOT REDESIGN THE WEBSITE.
DO NOT REBUILD THE DEMO.
DO NOT CHANGE THE EXISTING PRODUCT LOGIC.
DO NOT CHANGE THE BACKEND.
DO NOT REMOVE ANY EXISTING FUNCTIONALITY.

This is a controlled brand migration from AgentSentry → VetoPlane.

==================================================
1. BRAND
==================================================

Replace all customer-facing references to:

AgentSentry
Agent Sentry
AGENTSENTRY

with:

VetoPlane

The exact product name is:

VetoPlane

Never use:
- Veto Plane
- Veto-Plane
- VetoPlane AI
- VetoPlane Security

Primary positioning:

THE EXECUTION CONTROL PLANE FOR AUTONOMOUS AI

Primary product statement:

"AI agents can make autonomous decisions. VetoPlane controls what those decisions are actually allowed to execute."

Supporting description:

"VetoPlane is the execution-control layer between autonomous AI agents and the enterprise systems they can affect — governing identity, policy, approvals, runtime execution and evidence at transaction time."

==================================================
2. LOGO — USE ATTACHED ASSET
==================================================

Use the ATTACHED VetoPlane logo everywhere the existing AgentSentry logo appears.

Do NOT redraw, reinterpret, simplify, or replace it.

Preserve:
- exact proportions
- typography
- V/P symbol
- colors
- wordmark
- visual hierarchy
- aspect ratio

The supplied logo should have a strong, premium enterprise-infrastructure presence.

Use the logo at these sizes:

HEADER:
Medium/large and clearly readable.

HERO:
Large and prominent, similar to the large logo treatment currently used.

FOOTER:
Smaller but still clearly legible.

FAVICON:
Use the V/P symbol if the full logo does not fit.

Do not stretch or distort the logo.

==================================================
3. HOMEPAGE HERO
==================================================

Preserve the existing hero layout and visual design.

Update the hero to:

VetoPlane

THE EXECUTION CONTROL PLANE FOR AUTONOMOUS AI

"AI agents can make autonomous decisions. VetoPlane controls what those decisions are actually allowed to execute."

Keep the existing CTA structure.

Do not add unnecessary new buttons.

==================================================
4. CORE POSITIONING
==================================================

The site should consistently communicate:

VetoPlane is an execution-control plane for autonomous AI agents.

The product governs:

- Agent identity
- Deterministic execution policy
- Transaction-level governance
- Human approval
- Runtime enforcement
- Execution evidence
- Emergency execution control

Do NOT reposition VetoPlane as a generic API gateway.

Do NOT claim that VetoPlane replaces existing gateways.

==================================================
5. ARCHITECTURE
==================================================

Preserve the existing architecture.

Use this conceptual flow:

AI AGENT
    ↓
EXISTING API GATEWAY
    ↓
VetoPlane EXECUTION GATEWAY
    ↓
MCP / APIs / SaaS / DATABASES
    ↓
ENTERPRISE SYSTEMS

Clearly communicate:

"Integration over Replacement"

and:

"Keep your infrastructure. Add VetoPlane as the trusted execution-control boundary."

Also preserve:

"VetoPlane does NOT replace your existing API gateway or MCP server."

Existing gateways such as Kong, AWS API Gateway, Azure API Management and similar infrastructure remain in place.

Do not redesign this architecture.

==================================================
6. CONTROL PLANE / EXECUTION PLANE
==================================================

Where appropriate, use:

VetoPlane Control Plane

Responsible for:
- Policy
- Configuration
- Agent governance
- Approvals
- Audit
- Fleet management

VetoPlane Execution Gateway

Responsible for:
- Runtime enforcement
- Execution identity
- Policy evaluation
- Approval enforcement
- Rate limiting
- Downstream execution
- Execution evidence

Preserve the existing architecture and visual structure.

==================================================
7. TRANSACTION GOVERNANCE
==================================================

Preserve the existing transaction-governance experience.

Use the concept:

"DON'T JUST AUTHORIZE THE AGENT. GOVERN THE TRANSACTION."

The transaction view should continue to show concepts such as:

WHO
TENANT
WHAT
TOOL VERSION
ARGUMENTS
POLICY
EXECUTION ID
DECISION

Use:

"VetoPlane governs the transaction at execution time."

Do not turn this into a generic API authorization demo.

==================================================
8. HUMAN APPROVAL
==================================================

Preserve the existing human approval flow.

The central concept must remain:

"Approval is bound to one exact transaction."

Approval is transaction-specific and associated with:

- Tenant
- Agent
- Tool
- Tool version
- Arguments
- Policy version
- Execution ID
- Single-use approval credential
- Expiration

Use:

"Approving this transaction does not authorize the next one."

Do not imply that one approval creates permanent authorization.

==================================================
9. DENY / APPROVAL SCENARIOS
==================================================

Preserve the current demo scenarios.

The primary security example should continue to use a destructive or irreversible action such as:

delete_customer

For denial:

"DENIED — This execution is outside the agent's permitted action boundary."

For human approval:

"APPROVAL REQUIRED — This transaction requires explicit human authorization before execution."

Do not portray VetoPlane as the business-rule engine.

Business systems own business logic.

VetoPlane governs autonomous execution boundaries.

==================================================
10. EXECUTION LEDGER
==================================================

Keep:

Execution Ledger

Update branding only.

The ledger should continue to show:

- Agent
- Tool
- Tool version
- Arguments
- Policy decision
- Approval
- Execution ID
- Timestamp
- Downstream result
- Evidence

Do not convert this into a generic audit-log product.

==================================================
11. DEMO FLOW
==================================================

PRESERVE THE EXISTING DEMO.

The existing sequence should remain:

1. Register Agent
2. Connect Infrastructure
3. Register Tools
4. Configure Policy
5. Test Agent / Live Execution
6. Human Approval
7. Execution Ledger
8. Execution Control View

Only update visible branding and terminology.

Do not change the underlying state machine.

==================================================
12. REGISTER AGENT
==================================================

Preserve the existing Register Agent experience.

Use VetoPlane branding.

Keep:

"Agent identity will be evaluated on every execution."

Preserve all existing fields and interactions.

==================================================
13. CONNECT INFRASTRUCTURE
==================================================

Preserve the current architecture screen.

Show:

AI Agent
↓
Existing Gateway
(Kong / Enterprise API — RETAINED)
↓
VetoPlane Execution Gateway
↓
Customer MCP Server
(RETAINED)
↓
Enterprise Systems

Keep the existing deployment mode:

"Existing Gateway + VetoPlane"

and its existing recommended/integration messaging.

==================================================
14. REGISTER TOOLS
==================================================

Preserve the existing tools and behavior:

get_customer:v1
search_orders:v1
update_ticket:v1
refund_order:v1
delete_customer:v1

Preserve their current authorization/risk states.

Preserve:

"Tool Version Governance"

and:

"Published tool versions are immutable. Agent bindings reference an exact tool version."

Do not alter the underlying demo logic.

==================================================
15. STALE CONFIGURATION
==================================================

Preserve the existing stale-policy demonstration.

The flow should continue to communicate:

Gateway policy v42
Control Plane policy v43
↓
STALE
↓
RECONCILING
↓
Policy v43 confirmed
↓
Execution permitted

Preserve fail-closed behavior if authoritative policy cannot be confirmed.

==================================================
16. EMERGENCY SUSPEND
==================================================

Preserve:

"Suspend Agent"

and all existing behavior.

Do not invent new cancellation behavior.

Do not change the existing execution semantics.

==================================================
17. AUTO DEMO
==================================================

VERY IMPORTANT:

DO NOT REBUILD THE AUTO DEMO.

Preserve exactly:

- state machine
- transitions
- timing
- narration
- audio
- progress
- controls
- final state
- analytics
- backend calls

Only change visible AgentSentry branding to VetoPlane.

DO NOT replace working narration with browser TTS.

DO NOT add background music.

==================================================
18. CHATBOT
==================================================

Rename:

AgentSentry Assistant

to:

VetoPlane Assistant

Preserve all existing chatbot functionality.

IMPORTANT:

Keep the public contact email exactly:

contact@getagentsentry.com

Do not change the email routing.

Do not expose the underlying personal forwarding address.

Do not fabricate successful email delivery.

==================================================
19. FOUNDER
==================================================

Update:

"Founder, AgentSentry"

to:

"Founder, VetoPlane"

Use:

Prashant Shishir
Founder, VetoPlane

Preserve the existing professional photograph and layout.

Do not invent:
- customers
- funding
- revenue
- partnerships
- certifications
- traction
- investors

==================================================
20. METADATA
==================================================

Update the visible browser and social metadata.

TITLE:

VetoPlane | The Execution Control Plane for Autonomous AI

DESCRIPTION:

VetoPlane governs autonomous AI execution across enterprise systems with identity, deterministic policy, transaction-bound approval, runtime enforcement and execution evidence.

Update:
- page title
- meta description
- Open Graph title
- Open Graph description
- favicon
- application name
- accessible logo labels
- image alt text

==================================================
21. ROUTES
==================================================

DO NOT CHANGE EXISTING ROUTES.

Preserve:

/
/demo
/architecture
/use-cases
/about

==================================================
22. OLD BRAND SEARCH
==================================================

After completing the migration, search the entire project for:

AgentSentry
agentsentry
Agent Sentry
AGENTSENTRY

Remove or replace customer-facing references.

IMPORTANT:

Do NOT blindly rename technical identifiers if doing so could break the application.

Do NOT change:
- database IDs
- Supabase configuration
- API keys
- secrets
- backend identifiers
- Cloudflare configuration
- environment variables

unless absolutely necessary.

IMPORTANT:

Keep:

contact@getagentsentry.com

unchanged.

==================================================
23. VISUAL DESIGN
==================================================

Preserve the existing dark enterprise-security aesthetic.

The attached VetoPlane logo defines the new visual identity.

Maintain:
- dark navy / black
- electric blue
- cyan
- premium enterprise infrastructure aesthetic
- high contrast
- restrained futuristic styling

Do NOT introduce:
- cartoon AI
- robot imagery
- generic AI brains
- generic shields
- stock illustrations
- excessive glassmorphism
- excessive animation
- generic cybersecurity graphics

==================================================
24. DO NOT REDESIGN
==================================================

This is NOT a redesign.

DO NOT:
- rebuild the homepage
- rebuild the demo
- change application architecture
- change Supabase
- change authentication
- change routing
- change chatbot backend
- change analytics
- change email handling
- change demo state logic
- remove working interactions
- invent product capabilities
- invent customer proof
- invent security certifications
- invent integrations
- invent investor logos

ONLY:
1. Change AgentSentry branding → VetoPlane
2. Apply the attached VetoPlane logo
3. Update product terminology
4. Preserve existing UX
5. Preserve existing functionality
6. Perform visual QA

==================================================
25. FINAL QA
==================================================

Before finishing, inspect the entire website and demo.

Verify:

BRANDING
- VetoPlane is used consistently
- No unintended visible AgentSentry references remain
- Attached logo renders correctly
- Logo aspect ratio is preserved
- Hero logo is large and prominent
- Header logo is readable
- Footer logo is correct
- V/P favicon is correct

POSITIONING
- "The Execution Control Plane for Autonomous AI"
- Execution-control positioning remains intact
- Integration-over-Replacement remains intact
- Existing gateways remain explicitly retained

DEMO
- Register Agent works
- Connect Infrastructure works
- Register Tools works
- Configure Policy works
- Live Execution works
- Human Approval works
- Execution Ledger works
- Suspend Agent works
- Auto Demo works
- Existing narration works

BACKEND
- Chatbot still works
- Analytics still works
- Existing backend remains intact
- contact@getagentsentry.com remains unchanged

VISUAL
- No broken layouts
- No stretched logo
- No unexpected font changes
- No broken responsive behavior
- No accidental redesign

FINAL REQUIREMENT:

Transform the existing AgentSentry experience into:

VetoPlane

THE EXECUTION CONTROL PLANE FOR AUTONOMOUS AI

Use the attached logo as the single source of truth for the new brand.

Make the smallest possible set of changes.

DO NOT REBUILD WHAT ALREADY WORKS.

BRAND IT.
POLISH IT.
VERIFY IT.
PRESERVE THE PRODUCT.