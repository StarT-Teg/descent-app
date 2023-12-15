import {
    Accordion as LocalAccordion,
    AccordionItem as Item,
    AccordionItemProps,
    AccordionProps as LocalAccordionProps
} from "@szhsin/react-accordion";
import {ReactNode, SVGProps} from "react";
import {JSX} from "react/jsx-runtime";
import styles from './accordion.module.css'

export interface AccordionProps {
    children: ReactNode;
    accordionProps?: LocalAccordionProps;
}

const ChevronDownIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            fill="#000"
            fillRule="evenodd"
            d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z"
            clipRule="evenodd"
        />
    </svg>
)

export const AccordionItem = ({header, ...rest}: AccordionItemProps) => (
    <Item
        {...rest}
        header={
            <>
                {header}
                <ChevronDownIcon className={styles.chevron}/>
            </>
        }
        className={styles.item}
        buttonProps={{
            className: ({isEnter}) =>
                `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
        }}
        contentProps={{className: styles.itemContent}}
        panelProps={{className: styles.itemPanel}}
    />
);

export const Accordion = ({children, accordionProps}: AccordionProps) => {
    return (
        <>
            <div className={styles.accordion}>
                {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
                <LocalAccordion transition transitionTimeout={250} {...accordionProps}>
                    {children}
                </LocalAccordion>
            </div>
        </>
    );
}