
export const getContextSummary = (source: 'slack' | 'github' | 'gmail', type: string) => {
  switch (source) {
    case 'slack':
      return `**Leo:** [10:25AM] Returned from PTO, briefed by PA about a recent authentication service outage. 
      The incident was resolved, and the postmortem is available. 
      Three PRs await review, and there's a backlog of Slack messages and emails to address.`;
};

export const getContextDetails = (source: 'slack' | 'github' | 'gmail', type: string) => {
  switch (source) {
    case 'slack':
      return `**Alex Chen** [10:17 AM]
Here's what I'm thinking:

\`\`\`typescript
const validateUKPhone = (phone: string): boolean => {
  const ukPattern = /^(?:(?:\+44)|(?:0))(?:\d{10}|\d{9})$/;
  return ukPattern.test(phone);
};
\`\`\`

**Sarah Wang** [10:20 AM]
Good start! We should also consider:
- Area code validation
- Rate limiting for spam prevention
- Integration with existing systems

**James Miller** [10:22 AM]
> Rate limiting for spam prevention

This is crucial. I've seen a lot of spam attempts using automated scripts.

**Sarah Wang** [10:25 AM]
I'll create a GitHub issue to track these requirements.`;
    case 'github':
      return type === 'issue'
        ? `### Requirements
1. Format Support
   - +44 international prefix
   - 0 local prefix
   - Valid area codes

2. Spam Prevention
   - Rate limiting
   - Blacklist support

## Technical Specifications

\`\`\`typescript
interface ValidationConfig {
  maxAttempts: number;
  timeWindow: number; // in seconds
  allowedAreaCodes: string[];
}

const defaultConfig: ValidationConfig = {
  maxAttempts: 100,
  timeWindow: 3600,
  allowedAreaCodes: ['020', '0121', '0131']
};
\`\`\`

> **Note**: Implementation must be configurable per environment`
        : `\`\`\`diff
+ // Add validation utilities
+ import { ValidationConfig } from './types';
+ import { RateLimit } from './middleware';

+ // Configure rate limiting
+ app.use('/api/validate', RateLimit({
+   windowMs: 15 * 60 * 1000,
+   max: 100
+ }));
\`\`\`

### Changes
- Added test suite
- Added area code validation

Testing coverage: 95%
Performance impact: <5ms per validation`;
    case 'gmail':
      return `>> From: Client Product Team <product@client.com>
>> Here are our key requirements:
>>
>> 1. Must support all UK phone formats
>> 2. Need spam prevention
>> 3. Integration with our CRM
>>
>> Timeline is crucial here.

> From: Engineering Team <eng@company.com>
> Thanks for the details. Here's our proposed timeline:
>
> \`\`\`json
> {
>   "phases": {
>     "validation": "2 weeks",
>     "spam_prevention": "3 weeks",
>     "crm_integration": "1 week"
>   },
>   "total_estimate": "6 weeks"
> }
> \`\`\`

Let's proceed with this plan. Please ensure the spam prevention is particularly robust as we've had issues in the past.

Best regards,
Product Team`;
  }
};

export const getOriginalLink = (source: 'slack' | 'github' | 'gmail', type: string) => {
  switch (source) {
    case 'slack':
      return "https://slack.com/thread/123";
    case 'github':
      return `https://github.com/org/repo/${type}/456`;
    case 'gmail':
      return "https://mail.google.com/mail/u/thread/789";
  }
};
