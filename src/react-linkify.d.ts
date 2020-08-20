type Props = {
  children: React.ReactNode;
  componentDecorator?: (
    decoratedHref: string,
    decoratedText: string,
    key: number
  ) => React.ReactNode;
  hrefDecorator?: (href: string) => string;
  matchDecorator?: (text: string) => Array<Object>;
  textDecorator?: (text: string) => string;
};

declare module "react-linkify" {
  export default class Linkify extends React.Component<Props> {}
}
