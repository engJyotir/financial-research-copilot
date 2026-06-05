import re

from app.services.llm_service import LLMService


class FinancialIntelligenceService:

    @staticmethod
    def format_number(value):

        try:
            cleaned = value.replace(",", "")
            return f"${int(cleaned):,}"
        except:
            return value

    @staticmethod
    def extract_metrics(text: str):

        revenue_matches = re.findall(
            r"revenue[^0-9]*([\d,]+)",
            text,
            re.IGNORECASE
        )

        income_matches = re.findall(
            r"net income[^0-9]*([\d,]+)",
            text,
            re.IGNORECASE
        )

        asset_matches = re.findall(
            r"total assets[^0-9]*([\d,]+)",
            text,
            re.IGNORECASE
        )

        liability_matches = re.findall(
            r"total liabilities[^0-9]*([\d,]+)",
            text,
            re.IGNORECASE
        )

        equity_matches = re.findall(
            r"total equity[^0-9]*([\d,]+)",
            text,
            re.IGNORECASE
        )

        return {
            "revenue":
                FinancialIntelligenceService.format_number(
                    revenue_matches[0]
                )
                if revenue_matches
                else "Not Found",

            "net_income":
                FinancialIntelligenceService.format_number(
                    income_matches[0]
                )
                if income_matches
                else "Not Found",

            "assets":
                FinancialIntelligenceService.format_number(
                    asset_matches[0]
                )
                if asset_matches
                else "Not Found",

            "liabilities":
                FinancialIntelligenceService.format_number(
                    liability_matches[0]
                )
                if liability_matches
                else "Not Found",

            "equity":
                FinancialIntelligenceService.format_number(
                    equity_matches[0]
                )
                if equity_matches
                else "Not Found",
        }

    @staticmethod
    def analyze(text: str):

        metrics = (
            FinancialIntelligenceService
            .extract_metrics(text)
        )

        prompt = f"""
You are a senior equity research analyst.

IMPORTANT RULES:

ONLY USE INFORMATION PROVIDED BELOW.

DO NOT:
- invent company history
- invent founding dates
- invent stock tickers
- invent market capitalization
- invent headquarters
- invent products
- invent industries

If information is unavailable write:

"Not disclosed in document"

FINANCIAL DATA:

Revenue:
{metrics["revenue"]}

Net Income:
{metrics["net_income"]}

Assets:
{metrics["assets"]}

Liabilities:
{metrics["liabilities"]}

Equity:
{metrics["equity"]}

DOCUMENT:

{text[:10000]}

Return VALID MARKDOWN.

# Company Overview

# Business Model

# Financial Highlights

# Growth Drivers

# Risks

# Bull Case

# Bear Case

# Investment Recommendation
"""

        llm = LLMService.get_llm()

        response = llm.invoke(prompt)

        return response.content